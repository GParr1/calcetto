export const removeBackgroundAPI = async (photoUri: string): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('image_file', {
      uri: photoUri,
      name: 'photo.png',
      type: 'image/png',
    } as any); // 'as any' serve perché React Native FormData ha tipi diversi

    const res = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'i4L41YsoE4jvHSofw5RcWNZM'
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Errore Remove.bg:', errorText);
      return photoUri;
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob);

  } catch (err) {
    console.error('Errore nella rimozione dello sfondo:', err);
    return photoUri;
  }
};

export const dataURLtoFile = (dataUrl: string | undefined, filename: string): File | null => {
  if(!dataUrl){
    return null
  }
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}