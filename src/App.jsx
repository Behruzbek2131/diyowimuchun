import React, { useRef } from 'react';

const YoutubeBannerJpeg = () => {
  const canvasRef = useRef(null);

  const processBanner = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 1. YouTube standart o'lchami: 2560x1440
        canvas.width = 2560;
        canvas.height = 1440;

        // 2. Fonni to'ldirish (oq yoki qora - JPEG shaffoflikni qo'llamaydi)
        ctx.fillStyle = '#ffffff'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3. Rasmni markazga joylash (Safe Area: 1546x423 uchun moslab)
        // Bu rasm barcha qurilmalarda to'g'ri ko'rinishi uchun kerak
        const scale = Math.min(1546 / img.width, 423 / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        // Silliqlashni yoqamiz
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // 4. Rasmni chizish
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // 5. JPEG formatida yuklab olish
        const link = document.createElement('a');
        link.download = `youtube_banner_behruz_${Date.now()}.jpg`; // .jpg kengaytmasi
        
        // 'image/jpeg' - format, 0.95 - sifat (0 dan 1 gacha)
        link.href = canvas.toDataURL('image/jpeg', 0.95); 
        link.click();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5'
    }}>
      <div style={{ 
        padding: '30px', 
        background: '#fff', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center' 
      }}>
        <h2 style={{ color: '#ff0000' }}>YouTube Banner Maker (JPEG)</h2>
        <p style={{ color: '#555' }}>Rasmni yuklang va u 2560x1440 o'lchamda yuklanadi</p>
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={processBanner} 
          style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        />
        
        <div style={{ marginTop: '15px', fontSize: '12px', color: '#888' }}>
          Format: <b>JPEG</b> | Hajm: <b>2560x1440 px</b>
        </div>
      </div>

      {/* Yashirin canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default YoutubeBannerJpeg;