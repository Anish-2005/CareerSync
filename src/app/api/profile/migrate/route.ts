import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Profile from '@/models/Profile'
import { verifyFirebaseToken } from '@/lib/auth-middleware'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    let needsSave = false

    // Fix experience IDs
    if (profile.experience && profile.experience.length > 0) {
      profile.experience = profile.experience.map((exp: any) => {
        if (!exp.id) {
          needsSave = true
          return {
            ...exp,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
          }
        }
        return exp
      })
    }

    // Fix education IDs
    if (profile.education && profile.education.length > 0) {
      profile.education = profile.education.map((edu: any) => {
        if (!edu.id) {
          needsSave = true
          return {
            ...edu,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
          }
        }
        return edu
      })
    }

    // Fix skills IDs
    if (profile.skills && profile.skills.length > 0) {
      profile.skills = profile.skills.map((skill: any) => {
        if (!skill.id) {
          needsSave = true
          return {
            ...skill,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
          }
        }
        return skill
      })
    }

    // Fix certifications IDs
    if (profile.certifications && profile.certifications.length > 0) {
      profile.certifications = profile.certifications.map((cert: any) => {
        if (!cert.id) {
          needsSave = true
          return {
            ...cert,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
          }
        }
        return cert
      })
    }

    // Fix projects IDs
    if (profile.projects && profile.projects.length > 0) {
      profile.projects = profile.projects.map((project: any) => {
        if (!project.id) {
          needsSave = true
          return {
            ...project,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
          }
        }
        return project
      })
    }

    // Fix documents IDs
    if (profile.documents && profile.documents.length > 0) {
      profile.documents = profile.documents.map((doc: any) => {
        if (!doc.id) {
          needsSave = true
          return {
            ...doc,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
          }
        }
        return doc
      })
    }

    if (needsSave) {
      await profile.save()
    }

    return NextResponse.json({
      success: true,
      message: 'Profile data migration completed',
      profile,
      migrated: needsSave
    })

  } catch (error) {
    console.error('Error migrating profile data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}