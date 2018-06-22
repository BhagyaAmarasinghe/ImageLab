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
