# === AI Video Generator (Stable Video Diffusion) ===
from diffusers import StableVideoDiffusionPipeline
import torch
from PIL import Image
import imageio
import os

def generate_video(image_path, output_name="generated_video.mp4", frames_count=25, fps=6):
    """
    توليد فيديو من صورة واحدة باستخدام نموذج Stable Video Diffusion
    """
    print("🔄 جاري تحميل النموذج...")

    pipe = StableVideoDiffusionPipeline.from_pretrained(
        "stabilityai/stable-video-diffusion-img2vid-xt",
        torch_dtype=torch.float16,
        variant="fp16"
    ).to("cuda")

    print("🖼️ جاري فتح الصورة...")
    image = Image.open(image_path)

    print("🎬 جاري توليد الفيديو...")
    frames = pipe(image, num_frames=frames_count).frames[0]

    print("💾 جاري حفظ الفيديو...")
    imageio.mimsave(output_name, frames, fps=fps)

    print(f"✅ تم إنشاء الفيديو بنجاح! الملف: {output_name}")

if __name__ == "__main__":
    # استبدل الصورة بالمسار الصحيح في مشروعك
    image_path = "your_image.jpg"
    if os.path.exists(image_path):
        generate_video(image_path)
    else:
        print("⚠️ الصورة غير موجودة! ضع صورة في مجلد المشروع باسم your_image.jpg")
