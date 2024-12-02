import mongoose from "mongoose";
import model from "./model.js"
export function findModulesForCourse(_id) {
    console.log("looking for modules for this course id:", _id)
    return model.find({ course: _id });

}
export function createModule(module) {
    if (!module.moduleId) {
        module.moduleId = `module-${Date.now()}`; // Example: Generate unique courseId
      }
    delete module._id
    return model.create(module);
  }
  export function deleteModule(moduleId) {
    console.log("module id passed in dao:", moduleId)
    return model.deleteOne({ moduleId: moduleId});

   }
   export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);

  }
   