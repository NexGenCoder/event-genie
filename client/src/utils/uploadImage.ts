export const imageUpload = async (image: File, folderName: string) => {
   const bodyData = new FormData()
   bodyData.append('file', image)
   bodyData.append('upload_preset', 'mj53rhpy')
   //    add folder name to upload image to a specific folder
   bodyData.append('folder', folderName)

   try {
      const res = await fetch(
         'https://api.cloudinary.com/v1_1/dspyieeio/image/upload',
         {
            method: 'POST',
            body: bodyData,
         },
      )

      if (!res.ok) {
         throw new Error('Failed to upload image')
      }

      const data = await res.json()
      return data.secure_url
   } catch (error) {
      console.error('Error uploading image:', error)
      return null
   }
}
