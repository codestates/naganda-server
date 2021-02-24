const scheduleModel  = require('../../models/schedule')

//todo schedule 안에있는 best 제일 높은것 부터 4개 잘라서 출력 .limit(4).sort({age:-1}).then(...)
module.exports = {
    get: (req, res) => {
        scheduleModel.find({}).limit(4).sort('-best').exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).json(data);
          })
    }
}