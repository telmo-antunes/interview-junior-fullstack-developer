import { City, CityDocument } from '../schemas/city.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private readonly cityModel: Model<CityDocument>) {

  }
  
  async create(city: City) {
    return await this.cityModel.create(city);
  }
  async findAll(): Promise<City[]> {
    return await this.cityModel.find();
  }
  async findById(_id: string) {
    return await this.cityModel.findById(_id);
  }
  async findByName(cityName: string) {
      var cityNameAE = cityName.replace("ae", "ä");
      var cityNameOE = cityName.replace("oe", "ö");
      var cityNameUE = cityName.replace("ue", "ü");

    return await this.cityModel.find({cityName: {$in: [new RegExp(cityName, 'i'), new RegExp(cityNameAE, 'i'), new RegExp(cityNameOE, 'i'), new RegExp(cityNameUE, 'i')]}}).limit(5);
  }
  async update(_id: string, city: City) {
    return await this.cityModel.findByIdAndUpdate(_id, city, { new: true });
  }
  async delete(id: string) {
    return await this.cityModel.findByIdAndRemove(id);
  }
}