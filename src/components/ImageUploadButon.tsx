import "@uploadthing/react/styles.css"
import { UploadButton } from "@uploadthing/react"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import Swal from "sweetalert2"

type Props = {
    setImageURL: any
}

const ImageUploadButon = ({ setImageURL }: Props) => {
    return (
        <div className="flex flex-col items-start">
            <label className="text-white mb-4 text-lg">Upload an Image of your Recipe</label>
            <UploadButton<OurFileRouter>
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    setImageURL(res![0].fileUrl)
                    Swal.fire(
                        'Success!',
                        'Image Uploaded Successfully!',
                        'success'
                    )
                }}
                onUploadError={(error: Error) => {
                    const err = error.message
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err
                    })
                }}
            />
        </div>
    )
}

export default ImageUploadButon