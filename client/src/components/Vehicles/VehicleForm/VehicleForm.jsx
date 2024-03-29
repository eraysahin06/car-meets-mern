import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import carBrands from '../../../data/carBrands';

const VehicleForm = ({ vehicle: initialVehicle, onSubmit }) => {
    const [vehicle, setVehicle] = useState({
        make: '',
        model: '',
        year: ''
    });

    useEffect(() => {
        if (initialVehicle) {
            setVehicle(initialVehicle);
        }
    }, [initialVehicle]);

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(vehicle); // Pass the vehicle object directly
    };

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= 1930; year--) {
            years.push(<option key={year} value={year}>{year}</option>);
        }
        return years;
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">{initialVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h1>
          <div className="mb-4">
            <label htmlFor="make" className="block mb-2">Make</label>
            <select name="make" id="make" value={vehicle.make} onChange={handleChange} className="w-full text-black p-2 rounded-lg border border-gray-300">
              <option value="">Select Make</option>
              {Object.keys(carBrands).map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block mb-2">Model</label>
            <select name="model" id="model" value={vehicle.model} onChange={handleChange} className="w-full p-2 text-black rounded-lg border border-gray-300" disabled={!vehicle.make}>
              <option value="">Select Model</option>
              {vehicle.make && carBrands[vehicle.make].map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block mb-2">Year</label>
            <select name="year" id="year" value={vehicle.year} onChange={handleChange} className="w-full p-2 text-black rounded-lg border border-gray-300">
              <option value="">Select Year</option>
              {generateYearOptions()}
            </select>
          </div>
          <button type="submit" className="w-full p-2 bg-black hover:bg-gray-800 text-white rounded-lg font-bold">{initialVehicle ? 'Update Vehicle' : 'Add Vehicle'}</button>
        </form>
      );
      
};

VehicleForm.propTypes = {
    vehicle: PropTypes.shape({
        make: PropTypes.string,
        model: PropTypes.string,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    onSubmit: PropTypes.func.isRequired
};

export default VehicleForm;
