import { AccommodationLogic } from "../model/model_accommodation.js";
export class AccommodationController{
    constructor(){
      this.accommodationLogic = new AccommodationLogic();
    }
    async createAccommodation(req, res){
      const data = req.body;
      try{
        const newAccommodation = await this.accommodationLogic.createAccommodation(data);
        res.status(201).send(newAccommodation);
      }catch(error){
        res.status(400).send({ message: error.message });
      }
    }
    async getAllAccommodations(req, res){
      try{
        const accommodations = await this.accommodationLogic.getAllAccommodations();
        res.send(accommodations);
      }catch(error){
        res.status(500).send({ message: error.message });
      }
    }
    async getAccommodationById(req, res){
      const id = req.params.id;
      try{
        const accommodation = await this.accommodationLogic.getAccommodationById(id);
        if(!accommodation){
          return res.status(404).send({ message: "Accommodation not found" });
        }
        res.send(accommodation);
      }catch(error){
        res.status(500).send({ message: error.message });
      }
    }
    async deleteAccommodationById(req, res){
      const id = req.params.id;
      try{
        const deletedAccommodation = await this.accommodationLogic.deleteAccommodationById(id);
        if(!deletedAccommodation){
          return res.status(404).send({ message: "Accommodation not found" });
        }
        res.send({ message: "Accommodation deleted successfully" });
      }catch(error){
        res.status(500).send({ message: error.message });
      }
    }
    async updateAccommodationById(req, res){
      const id = req.params.id;
      const newData = req.body;
      try{
        const updatedAccommodation = await this.accommodationLogic.updateAccommodationById(id, newData);
        if(!updatedAccommodation){
          return res.status(404).send({ message: "Accommodation not found" });
        }
        res.send(updatedAccommodation);
      }catch(error){
        res.status(500).send({ message: error.message });
      }
    }
  }