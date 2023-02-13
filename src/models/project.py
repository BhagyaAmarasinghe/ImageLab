import uuid

from flask import session

from src.common.database import Database

class Project(object):
     def __init__(self, projectId, projectName, projectDescription):
        self.projectId = projectId
        self.projectName = projectName
        self._projectDescription = projectDescription

    @classmethod
    def get_project(cls, projectId):
        data = Database.find_one("project", {"projectId": projectId})
        if data is not None:
            return cls(**data)

    @staticmethod
    def create_project(projectName, projectDescription):
        projectId = get_project(projectId)
        if projectId is not None:
            return  project.projectId == projectId
        return  False


    def save_to_mongo(self):
      print(self.json())
      Database.insert("project", self.json())