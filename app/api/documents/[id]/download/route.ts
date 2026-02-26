import { getDocumentById, formatFileSize } from '@/lib/documents'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doc = getDocumentById(params.id)

    if (!doc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    // In production, you would:
    // 1. Verify user authentication
    // 2. Check document access permissions
    // 3. Stream file from storage (S3, Vercel Blob, etc.)
    // 4. Log download activity for audit trail

    // Mock response indicating file would be downloaded
    return NextResponse.json({
      success: true,
      message: `Document "${doc.title}" download initiated`,
      document: {
        id: doc.id,
        title: doc.title,
        filename: doc.filename,
        size: formatFileSize(doc.filesize),
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download document' },
      { status: 500 }
    )
  }
}
