const service = require("./member.service");

async function getAll(req, res) {
  const result = await service.getMembers(req.query);

  res.json({
    success: true,

    data: result,
  });
}
async function getOne(req, res) {
  const result = await service.getMember(req.params.id);

  res.json({
    success: true,

    data: result,
  });
}

async function create(req, res) {
  const result = await service.createMember(req.body);

  res.status(201).json({
    success: true,

    data: result,
  });
}

async function update(req, res) {
  const result = await service.updateMember(
    req.params.id,

    req.body,
  );

  res.json({
    success: true,

    data: result,
  });
}

async function remove(req, res) {
  const result = await service.removeMember(req.params.id);

  res.json({
    success: true,

    data: result,
  });
}

async function updateStatus(req, res) {
  const result = await service.changeMemberStatus(
    req.params.id,

    req.body.status,
  );

  res.json({
    success: true,

    data: result,
  });
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  updateStatus,
};
