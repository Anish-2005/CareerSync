import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Resume from '@/models/Resume'
import { verifyFirebaseToken } from '@/lib/auth-middleware'

// GET - Load user's resume draft
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resume = await Resume.findOne({ userId: decodedToken.uid })

    if (!resume) {
      return NextResponse.json({ message: 'No resume draft found' }, { status: 404 })
    }

    return NextResponse.json({
      resume: {
        personalInfo: resume.personalInfo,
        experience: resume.experience,
        education: resume.education,
        skills: resume.skills,
        projects: resume.projects,
        selectedTemplate: resume.selectedTemplate
      }
    })

  } catch (error) {
    console.error('Error loading resume:', error)
    return NextResponse.json({ error: 'Failed to load resume' }, { status: 500 })
  }
}

// POST - Save/update resume draft
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { personalInfo, experience, education, skills, projects, selectedTemplate } = body

    // Validate required fields
    if (!personalInfo || !personalInfo.firstName || !personalInfo.lastName || !personalInfo.email) {
      return NextResponse.json({ error: 'Missing required personal information' }, { status: 400 })
    }

    // Upsert the resume (update if exists, create if not)
    const resume = await Resume.findOneAndUpdate(
      { userId: decodedToken.uid },
      {
        personalInfo,
        experience: experience || [],
        education: education || [],
        skills: skills || [],
        projects: projects || [],
        selectedTemplate: selectedTemplate || 'modern'
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    )

    return NextResponse.json({
      message: 'Resume draft saved successfully',
      resumeId: resume._id
    })

  } catch (error) {
    console.error('Error saving resume:', error)
    return NextResponse.json({ error: 'Failed to save resume' }, { status: 500 })
  }
}