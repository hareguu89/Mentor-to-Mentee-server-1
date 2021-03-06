const { qa, mentor, mentee } = require('../../models')

module.exports = {
    post: async (req, res) => {
        console.log(req.body)
        if (req.body.brief && req.body.question) {
            let menteeInfo = await mentee.findOne({ where: { menteeEmail: req.body.email } })
            let mentorInfo = await mentor.findOne({ where: { mentorEmail: req.body.mentorEmail } })
            let qaInfo = await qa.create({
                brief: req.body.brief,
                question: req.body.question,
                menteeId: menteeInfo.dataValues.id,
                mentorId: mentorInfo.dataValues.id
            })
            res.json({ data: qaInfo, message: "Message is created"})
        } else {
            res.json({ data: null, message: "Please fill in all the required fields" })
        }
    }
}