import mongoose from 'mongoose';
const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    manager: {
        type: String,
        required: true,
      },
});
const TeamMember = mongoose.model('team_member', teamMemberSchema);
export default TeamMember;