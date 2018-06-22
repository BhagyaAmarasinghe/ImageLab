from PIL import Image, ImageDraw
import sys 

im = Image.open(sys.argv[1])

draw = ImageDraw.Draw(im)

try:  
	with open(sys.argv[2]) as fp:  
   		lines = fp.readlines()
	for line in lines:
		xy = [x.strip() for x in line.split(',')];
		print(xy);
		draw.ellipse([(float(xy[0])-3, float(xy[1])-3),(float(xy[0])+3, float(xy[1])+3)], fill='red')
	
	del draw	
 	im.save("output.png")

finally:  
    fp.close()
