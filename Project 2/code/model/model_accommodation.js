import { AccommodationModel } from "../schemas/schemas_accommodation.js";
export class AccommodationLogic{
    // create new 
    async createAccommodation(data){
        try{
          const accommodation = new AccommodationModel(data);
          const newAccommodation = await accommodation.save();
          return newAccommodation;
        }catch(error){
          throw new Error(error.message);
        }
      }
      // read all 
      async getAllAccommodations(){
        try{
          const accommodations = await AccommodationModel.find();
          return accommodations;
        }catch(error){
          throw new Error(error.message);
        }
      }
      // read by id 
      async getAccommodationById(id){
        try{
          const accommodation = await AccommodationModel.findById(id);
          return accommodation;
        }catch(error){
          throw new Error(error.message);
        }
      }
      // delete by id
      async deleteAccommodationById(id){
        try{
          const deletedAccommodation = await AccommodationModel.findByIdAndDelete(id);
          return deletedAccommodation;
        }catch(error){
          throw new Error(error.message);
        }
      }
      // update by id 
      async updateAccommodationById(id, newData){
        try{
          const updatedAccommodation = await AccommodationModel.findByIdAndUpdate(id, newData, { new: true });
          return updatedAccommodation;
        }catch(error){
          throw new Error(error.message);
        }
      }
}
