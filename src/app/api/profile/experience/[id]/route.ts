import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Profile from '@/models/Profile'
import { verifyFirebaseToken } from '@/lib/auth-middleware'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: experienceId } = await params

    console.log('PUT Experience API called with ID:', experienceId)
    console.log('ID type:', typeof experienceId)

    // Get experience data from request
    const experienceData = await request.json()

    console.log('Experience data received:', experienceData)

    // Validate required fields
    if (!experienceData.company?.trim() || !experienceData.position?.trim() || !experienceData.startDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    console.log('Profile found. Experience entries:', profile.experience?.map((exp: any) => ({
      id: exp.id,
      company: exp.company,
      idType: typeof exp.id
    })))

    // Ensure all experience entries have IDs (migration for old data)
    if (profile.experience) {
      let needsSave = false
      profile.experience = profile.experience.map((exp: any) => {
        if (!exp.id) {
          needsSave = true
          return { ...exp, id: Date.now().toString() + Math.random().toString(36).substr(2, 9) }
        }
        return exp
      })
      if (needsSave) {
        await profile.save()
      }
    }

    // Find the experience to update
    let experienceIndex = profile.experience?.findIndex((exp: any) => {
      console.log(`Comparing exp.id (${exp.id}, type: ${typeof exp.id}) with experienceId (${experienceId}, type: ${typeof experienceId})`)
      // Try both string and number comparison in case of type mismatch
      const matches = exp.id === experienceId || exp.id?.toString() === experienceId?.toString()
      console.log('Match result:', matches)
      return matches
    })

    console.log('Experience index found:', experienceIndex)

    // If not found, try a more lenient search (case-insensitive, trim whitespace)
    if (experienceIndex === -1 || experienceIndex === undefined) {
      console.log('Primary search failed, trying fallback search...')
      const fallbackIndex = profile.experience?.findIndex((exp: any) => {
        const expIdStr = exp.id?.toString().toLowerCase().trim()
        const searchIdStr = experienceId?.toString().toLowerCase().trim()
        const fallbackMatch = expIdStr === searchIdStr
        console.log(`Fallback comparison: exp.id "${expIdStr}" vs "${searchIdStr}" = ${fallbackMatch}`)
        return fallbackMatch
      })
      console.log('Fallback index found:', fallbackIndex)

      if (fallbackIndex !== -1 && fallbackIndex !== undefined) {
        console.log('Using fallback index')
        experienceIndex = fallbackIndex
      }
    }

    if (experienceIndex === -1 || experienceIndex === undefined) {
      console.log('Final result: Experience not found')
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    // Update the experience entry
    const updatedExperience = {
      ...profile.experience[experienceIndex],
      company: experienceData.company.trim(),
      position: experienceData.position.trim(),
      startDate: new Date(experienceData.startDate),
      endDate: experienceData.current ? undefined : experienceData.endDate ? new Date(experienceData.endDate) : undefined,
      current: experienceData.current || false,
      description: experienceData.description?.trim() || '',
      location: experienceData.location?.trim() || '',
    }

    // Update experience in profile
    profile.experience[experienceIndex] = updatedExperience

    // Save the updated profile
    await profile.save()

    return NextResponse.json({
      success: true,
      profile,
      experience: updatedExperience
    })

  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: experienceId } = await params

    console.log('DELETE Experience API called with ID:', experienceId)
    console.log('ID type:', typeof experienceId)

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    console.log('Profile found. Experience entries:', profile.experience?.map((exp: any) => ({
      id: exp.id,
      company: exp.company,
      idType: typeof exp.id
    })))

    // Find the experience to delete
    let experienceIndex = profile.experience?.findIndex((exp: any) => {
      console.log(`Comparing exp.id (${exp.id}, type: ${typeof exp.id}) with experienceId (${experienceId}, type: ${typeof experienceId})`)
      // Try both string and number comparison in case of type mismatch
      const matches = exp.id === experienceId || exp.id?.toString() === experienceId?.toString()
      console.log('Match result:', matches)
      return matches
    })

    console.log('Experience index found:', experienceIndex)

    // If not found, try a more lenient search (case-insensitive, trim whitespace)
    if (experienceIndex === -1 || experienceIndex === undefined) {
      console.log('Primary search failed, trying fallback search...')
      const fallbackIndex = profile.experience?.findIndex((exp: any) => {
        const expIdStr = exp.id?.toString().toLowerCase().trim()
        const searchIdStr = experienceId?.toString().toLowerCase().trim()
        const fallbackMatch = expIdStr === searchIdStr
        console.log(`Fallback comparison: exp.id "${expIdStr}" vs "${searchIdStr}" = ${fallbackMatch}`)
        return fallbackMatch
      })
      console.log('Fallback index found:', fallbackIndex)

      if (fallbackIndex !== -1 && fallbackIndex !== undefined) {
        console.log('Using fallback index')
        experienceIndex = fallbackIndex
      }
    }

    if (experienceIndex === -1 || experienceIndex === undefined) {
      console.log('Final result: Experience not found')
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    // Remove the experience entry
    profile.experience.splice(experienceIndex, 1)

    // Save the updated profile
    await profile.save()

    return NextResponse.json({
      success: true,
      profile
    })

  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}