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


with tf.Session(graph=g1) as sess, g1.device('/cpu:0'):
    tf.import_graph_def(net['graph_def'], name='vgg')

def get_img_content_(img_4d):
    with tf.Session(graph=g1) as sess, g1.device('/gpu:0'):


            content_layer = 'imgLayer'
            content_features= g1.get_tensor_by_name(content_layer).eval(
                    session=sess,
                    feed_dict={x1: img_4d
                    })
                    
            print (content_features.shape)
            return content_features