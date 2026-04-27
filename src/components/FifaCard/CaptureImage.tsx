import React, { useState, useRef, useEffect } from 'react'
import { removeBackground, uploadImage } from 'utils/utils'
import { SVGPlusCircleFilled } from 'components/SVG/SVGPlus'
import { SVGCloseCircleFilled } from 'components/SVG/SVGClose'
import { SVGRefreshCircleFilled } from 'components/SVG'
import { useSelector } from 'react-redux'
import { getUser } from 'state/auth/selectors'
import { User } from 'types/user'

interface CaptureImageProps {
  enableEdit?: boolean
  playerImage?: string | null
}

const CaptureImage: React.FC<CaptureImageProps> = ({ enableEdit = true, playerImage }) => {
  const user: User | null = useSelector(getUser)
  const [previewImg, setPreviewImg] = useState<string | null>(playerImage || null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // 🎥 Gestione webcam
  useEffect(() => {
    if (!enableEdit || !cameraActive) return

    const videoEl = videoRef.current
    let stream: MediaStream | undefined

    const startCamera = async () => {
      try {
        setLoading(true)
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoEl) {
          videoEl.srcObject = stream
          await videoEl.play()
        }
      } catch (err) {
        console.error('Errore accesso webcam:', err)

        setCameraActive(false)
      } finally {
        setLoading(false)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (videoEl) {
        videoEl.srcObject = null
      }
    }
  }, [enableEdit, cameraActive])

  // 📸 Scatta foto dalla webcam
  const capturePhoto = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    setLoading(true)
    try {
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Impossibile ottenere il contesto canvas')

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, 'image/png')
      )

      if (!blob) {
        return
      }

      const photo = new File([blob], `camera-photo-${Date.now()}.png`, {
        type: 'image/png'
      })

      const cleaned = await removeBackground(photo)
      const finalFile = cleaned || photo
      setFile(finalFile)
      setPreviewImg(URL.createObjectURL(finalFile))
      setCameraActive(false)
    } catch (error) {
      console.error('Errore nella cattura foto:', error)
    } finally {
      setLoading(false)
    }
  }

  // ☁️ Upload su Cloudinary
  const handleUpload = async () => {
    if (!file) {
      return
    }
    if (!user) {
      return
    }

    setLoading(true)
    try {
      const { errorMessage, successMessage } = await uploadImage({ user, file, isDragAndDrop: true })
      if (errorMessage) {
        return
      }

      setFile(null)
      setCameraActive(false)
    } catch (err) {
      console.error('Errore upload:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateFoto = async () => {
    if (!file) {
      setCameraActive(true)
    } else {
      await handleUpload()
    }
  }

  return (
    <>
      {/* 🔹 Spinner caricamento */}
      {loading && (
        <div className="div-face_image d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      )}

      {/* 🎥 Fotocamera attiva */}
      {cameraActive && (
        <>
          <video
            className={`div-face_image ${loading ? 'd-none' : ''}`}
            ref={videoRef}
            style={{ objectFit: 'cover' }}
          />
          <div className="div-face_image add " style={{ height: 'auto' }}>
            <button className="bg-transparent me-2" onClick={capturePhoto}>
              <i className="icon-left bi bi-check-circle-fill"></i>
            </button>
            <button
              className="bg-transparent me-2"
              onClick={() => {
                setCameraActive(false)
                setFile(null)
              }}
            >
              <i className="icon-rigth bi bi-x-circle-fill"></i>
            </button>
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      )}

      {/* 🧍 Anteprima immagine */}
      {!cameraActive && (
        <>
          <button
            className="p-0 border-0 bg-transparent"
            disabled={!enableEdit}
            style={!enableEdit ? { cursor: 'default' } : {}}
            onClick={() => setCameraActive(true)}
          >
            <span
              className={`div-face_image ${enableEdit ? 'edit' : ''} ${!previewImg ? 'empty' : ''}`}
              role="button"
              style={{ backgroundImage: `url(${previewImg})` }}
            ></span>
          </button>

          {file && (
            <div className="div-face_image d-flex justify-content-between" style={{ height: 'auto' }}>
              <button type="button" className="bg-transparent me-2" onClick={handleUpdateFoto}>
                <SVGPlusCircleFilled />
              </button>
              <button type="button" className="bg-transparent me-2" onClick={() => setCameraActive(true)}>
                <SVGRefreshCircleFilled />
              </button>
              <button
                type="button"
                className="bg-transparent me-2"
                onClick={() => {
                  setCameraActive(false)
                  setFile(null)
                }}
              >
                <SVGCloseCircleFilled />
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CaptureImage
