const usersModel = require("../../models/user");

module.exports = {
	patch: (req, res) => {
        try {
            usersModel.updateOne({_id: req.params.userid}, {$set: req.body}, (err, data) => {
                console.log(data)
                if (err) return res.status(400).json({message: "사용자를 찾을 수 없습니다" });
                res.status(200).json({message: "정상적으로 수정되었습니다" })
            })
        } catch (err) {
            return res.status(500).json(err);
        }
	}
};
