from pathlib import *

# Renames all images.. because i have to go through the hell of renaming hundreds of images.. like wow.. great assessment
for image in Path("./img/").rglob("*.jpg"):
    image = image.absolute()
    image.rename(image.parent / image.name.replace(" ", "").replace("(", "").replace(")", "").replace("-", "_"))
