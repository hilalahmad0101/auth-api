import { prisma } from "../../helper/helper.js";
export const registerRider = async (req, res) => {
    try {
        console.log(req.body);
        const {
            name,
            date_of_birth,
            cnic,
            email,
            pink_driver,
            profile,
            address,
            city,
            country,
            cnic_front,
            cnic_back,
            driving_license_front,
            driving_license_back,
            vehicle_picture_front,
            vehicle_picture_back,
            selfie_with_license,
            vehicle_registration,
            modal,
            vehicle_maker,
            color,
            cc,
            car_number,
        } = req.body;

        const rider = await prisma.rider.create({
            data: {
                name,
                date_of_birth,
                cnic,
                email,
                pink_driver,
                profile,
                address,
                city,
                country,
                cnic_front,
                cnic_back,
                driving_license_front,
                driving_license_back,
                vehicle_picture_front,
                vehicle_picture_back,
                selfie_with_license,
                vehicle_registration,
                modal,
                vehicle_maker,
                color,
                cc,
                car_number,
                userId: req.user_id
            }
        });

        await prisma.user.update({
            where: { id: req.user_id },
            data: {
                type: 'rider'
            }
        });

        return res.status(200).json({
            success: true,
            message: ["Rider registered successfully"]
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: [e.message]
        });
    }
};


export const getSingleRider = async (req, res) => {
    try {
        const rider = await prisma.rider.findFirst({
            where: { id: req.params.id },
            include: {
                user: {
                    select: {
                        full_name: true,
                        email: true,
                        phone: true,
                        cnic: true,
                        profile_pic: true
                    }
                }
            },
        });
        if (rider.userId !== req.user_id) {
            return res.status(403).json({
                success: false,
                message: ['You are not authorized to view this rider']
            });
        }
        return res.status(200).json({
            success: true,
            data: rider
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: [e.message]
        });
    }
}


export const updateRider = async (req, res) => {
    try {
        let owner_of_rider = await prisma.rider.findFirst({
            where: { id: req.params.id }
        });
        if (req.user_id !== owner_of_rider.userId) {
            return res.status(403).json({
                success: false,
                message: ['You are not the owner of this rider']
            });
        }
        const {
            name,
            date_of_birth,
            cnic,
            email,
            pink_driver,
            profile,
            address,
            city,
            country,
            cnic_front,
            cnic_back,
            driving_license_front,
            driving_license_back,
            vehicle_picture_front,
            vehicle_picture_back,
            selfie_with_license,
            vehicle_registration,
            modal,
            vehicle_maker,
            color,
            cc,
            car_number,
        } = req.body;

        const rider = await prisma.rider.update({
            where: { id: req.params.id },
            data: {
                name,
                date_of_birth,
                cnic,
                email,
                pink_driver,
                profile,
                address,
                city,
                country,
                cnic_front,
                cnic_back,
                driving_license_front,
                driving_license_back,
                vehicle_picture_front,
                vehicle_picture_back,
                selfie_with_license,
                vehicle_registration,
                modal,
                vehicle_maker,
                color,
                cc,
                car_number,
            }
        });

        return res.status(200).json({
            success: true,
            message: ["Rider Update successfully"]
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: [e.message]
        });
    }
}