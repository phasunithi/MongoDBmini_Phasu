import TeamMember from "../models/TeamMember.js";
// Get all team members under a manager
export const getTeamMembersByManager = async (req, res) => {
    try {
        const { manager_id } = req.params;
        // ดึงสมาชิกในทีมที่มี manager_id ตรงกับที่ระบุ
        const teamMembers = await TeamMember.find();
        console.log (manager_id)
        console.log (teamMembers)
        // ส่งคืนข้อมูล
        res.status(200).json(
            teamMembers.map(member => ({
                id: member._id,
                name: member.name,
                position: member.position,
            }))
        );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};