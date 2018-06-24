import tensorflow as tf
import time
import sys
import config as cfg

print(cfg)
training_folder = cfg.config['train-images']
testing_folder = cfg.config['test-images']

training_folder_len = len([name for name in os.listdir(training_folder)])
testing_folder_len = len([name for name in os.listdir(testing_folder)])

def get_img_model():
    with open("vgg16.tfmodel", mode='rb') as f:
        graph_def = tf.GraphDef()
        try:
            graph_def.ParseFromString(f.read())
        except:

    return {
        'graph_def': graph_def
    }

def imgProcessor(imgId):
    return np.clip(img * 255, 0, 255).astype(np.uint8)

net = get_vgg_model()

g1 = tf.Graph()


for j in range(0,r,20):

    for i in range(j+0,j+20-m):

        og = plt.imread(cfg.config['train-images']+str(i)+".png")
        og = preprocess(og)
        img.append(og)

    img=[]
    start_time = time.time()
    if j==r-1:
        g1 = j+batch-training_folder_len


    x1 = g1.get_tensor_by_name('vgg/images' + ':0')

    img_4d = np.array(img)

with tf.Session(graph=g1) as sess, g1.device('/cpu:0'):
    tf.import_graph_def(net['graph_def'], name='vgg')

r = (testing_folder_len - (testing_folder_len%25))+1

for j in range(0,r,25):

    checkTestCodeExists = os.path.isdir(cfg.config['test-code'])

    if (checkTestCodeExists == False):
        os.mkdir(cfg.config['test-code'])
        
    file_Name = cfg.config['test-code']+"/"+str(j)

    fileObject = open(file_Name,'wb')

    pickle.dump(test_img,fileObject)

    test_img = []
    start_time = time.time()
    x1 = g1.get_tensor_by_name('vgg/images' + ':0')

    if j==r-1:
        m = j+25-testing_folder_len

    for i in range(j+0,j+25-m):

        og = plt.imread(cfg.config['train-images']+str(i)+".png")
        og = preprocess(og)




    img_4d = np.array(test_img)


    test_img = get_content_feature(img_4d).reshape((get_content_feature(img_4d).shape[0],7*7*512))

    fileObject.close()




def get_img_content_(img_4d):
     if (checkTrainCodeExists == False):
        os.mkdir(cfg.config['train-code'])
        
    with tf.Session(graph=g1) as sess, g1.device('/gpu:0'):


            content_layer = 'imgLayer'
            content_features= g1.get_tensor_by_name(content_layer).eval(
                    session=sess,
                    feed_dict={x1: img_4d
                    })

            print (content_features.shape)
            return content_features

    r = (training_folder_len - (training_folder_len%batch))+1

    file_Name = cfg.config['train-code']+"/"+str(j)
    fileObject = open(file_Name,'wb')

   
    
    content_features = get_content_feature(img_4d).reshape((get_content_feature(img_4d).shape[0],7*7*512))

    checkTrainCodeExists = os.path.isdir(cfg.config['train-code'])
                                                                                                                                  
    fileObject.close()                                


