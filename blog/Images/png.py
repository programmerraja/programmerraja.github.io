import os
from PIL import Image


def convert_images_to_png(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith(".webp"):
            file_path = os.path.join(folder_path, filename)

            with Image.open(file_path) as img:
                png_filename = f"{os.path.splitext(filename)[0]}.png"
                png_path = os.path.join(folder_path, png_filename)
                img.save(png_path, "PNG")

            print(f"Converted: {filename} -> {png_filename}")
            os.remove(file_path)


if __name__ == "__main__":
    folder_path = "./"

    convert_images_to_png(folder_path)


# import os
# from PIL import Image

# target_width = 300
# target_height = 800


# def convert_images_to_png(folder_path):
#     for filename in os.listdir(folder_path):
#         if filename.endswith(".webp"):
#             file_path = os.path.join(folder_path, filename)

#             with Image.open(file_path) as img:
#                 # Calculate the new dimensions while maintaining the aspect ratio
#                 img_ratio = img.width / img.height
#                 target_ratio = target_width / target_height

#                 if img_ratio > target_ratio:
#                     # Image is wider, adjust width
#                     new_width = target_width
#                     new_height = round(target_width / img_ratio)
#                 else:
#                     # Image is taller, adjust height
#                     new_height = target_height
#                     new_width = round(target_height * img_ratio)

#                 # Resize the image
#                 resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

#                 # Convert to PNG format and save
#                 png_filename = f"{os.path.splitext(filename)[0]}.png"
#                 png_path = os.path.join(folder_path, png_filename)
#                 resized_img.save(png_path, "PNG")

#             print(f"Converted: {filename} -> {png_filename}")
#             os.remove(file_path)


# if __name__ == "__main__":
#     folder_path = "./"

#     convert_images_to_png(folder_path)
