import { NextRequest, NextResponse } from 'next/server'
import { verifyFirebaseToken } from '@/lib/auth-middleware'
import { adminDb, adminStorage } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    console.log('Profile photo upload request received')

    // Verify authentication
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      console.log('No valid token found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = decodedToken.uid
    console.log('User ID:', userId)

    // Get the form data
    const formData = await request.formData()
    const file = formData.get('photo') as File

    if (!file) {
      console.log('No photo file provided')
      return NextResponse.json({ error: 'No photo file provided' }, { status: 400 })
    }

    console.log('File received:', file.name, 'Size:', file.size, 'Type:', file.type)

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'
      }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({
        error: 'File too large. Maximum size is 5MB.'
      }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Generate unique filename
    const fileExtension = file.name.split('.').pop() || 'jpg'
    const filename = `profile-photos/${userId}/${Date.now()}.${fileExtension}`

    console.log('Uploading to Firebase Storage:', filename)
    console.log('Bucket name:', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)

    // Upload to Firebase Storage
    const bucket = adminStorage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
    console.log('Bucket object created')
    const fileRef = bucket.file(filename)
    console.log('File reference created')

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          uploadedBy: userId,
          uploadedAt: new Date().toISOString(),
        },
      },
    })

    // Make the file publicly accessible
    await fileRef.makePublic()

    console.log('File uploaded and made public successfully')

    // Get the public URL
    const photoURL = `https://storage.googleapis.com/${bucket.name}/${filename}`
    console.log('Photo URL generated:', photoURL)

    // Update user profile in Firestore
    const userProfileRef = adminDb.collection('profiles').doc(userId)
    await userProfileRef.set({
      photoURL: photoURL,
      updatedAt: new Date(),
    }, { merge: true })

    console.log('Profile updated with photo URL')

    return NextResponse.json({
      message: 'Profile photo uploaded successfully',
      photoURL: photoURL,
    })

  } catch (error) {
    console.error('Profile photo upload error:', error)
    return NextResponse.json({
      error: 'Failed to upload profile photo'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('Profile photo delete request received')

    // Verify authentication
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = decodedToken.uid

    // Get current profile to find the photo URL
    const userProfileRef = adminDb.collection('profiles').doc(userId)
    const profileDoc = await userProfileRef.get()

    if (!profileDoc.exists) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const profileData = profileDoc.data()
    const photoURL = profileData?.photoURL

    if (photoURL) {
      // Extract filename from URL
      const urlParts = photoURL.split('/')
      const filename = urlParts.slice(-2).join('/') // Gets "profile-photos/userId/filename"

      console.log('Deleting photo from storage:', filename)

      // Delete from Firebase Storage
      const bucket = adminStorage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
      const fileRef = bucket.file(filename)
      await fileRef.delete()

      // Remove photoURL from profile
      await userProfileRef.update({
        photoURL: null,
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({
      message: 'Profile photo deleted successfully'
    })

  } catch (error) {
    console.error('Profile photo delete error:', error)
    return NextResponse.json({
      error: 'Failed to delete profile photo'
    }, { status: 500 })
  }
}