import System from "../models/Master.model.js";


export const addSystem = async (req, res) => {
    try {
        const { ram, systemType, hdd, monitorType, brand, monitorSNo, os, msOffice } = req.body;

        const newSystem = new System({
            ram,
            systemType,
            hdd,
            monitorType,
            brand,
            monitorSNo,
            os,
            msOffice
        });

        const savedSystem = await newSystem.save();
        res.status(201).json(savedSystem);
    } catch (error) {
        console.error('Error adding system:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all systems
export const getSystems = async (req, res) => {
    try {
        const systems = await System.find();
        res.status(200).json(systems);
    } catch (error) {
        console.error('Error fetching systems:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a system by ID
export const getSystemById = async (req, res) => {
    try {
        const { id } = req.params;
        const system = await System.findById(id);

        if (!system) {
            return res.status(404).json({ message: 'System not found' });
        }

        res.status(200).json(system);
    } catch (error) {
        console.error('Error fetching system:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a system by ID
export const updateSystem = async (req, res) => {
    try {
        const { id } = req.params;
        const { ram, systemType, hdd, monitorType, brand, monitorSNo, os, msOffice } = req.body;

        const updatedSystem = await System.findByIdAndUpdate(
            id,
            { ram, systemType, hdd, monitorType, brand, monitorSNo, os, msOffice },
            { new: true }
        );

        if (!updatedSystem) {
            return res.status(404).json({ message: 'System not found' });
        }

        res.status(200).json(updatedSystem);
    } catch (error) {
        console.error('Error updating system:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a system by ID
export const deleteSystem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSystem = await System.findByIdAndDelete(id);

        if (!deletedSystem) {
            return res.status(404).json({ message: 'System not found' });
        }

        res.status(200).json({ message: 'System deleted successfully' });
    } catch (error) {
        console.error('Error deleting system:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
