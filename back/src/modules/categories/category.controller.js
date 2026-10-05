const service = require("./category.service");

async function getAll(req, res) {
  try {
    const result = await service.getCategories(req.query);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getOne(req, res) {
  try {
    const result = await service.getCategory(req.params.id);

    res.json(result);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}

async function create(req, res) {
  try {
    const result = await service.createCategory(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

async function update(req, res) {
  try {
    const result = await service.updateCategory(req.params.id, req.body);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

async function updateStatus(req, res) {
  try {
    const result = await service.updateStatus(
      req.params.id,
      req.body.is_active,
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

async function remove(req, res) {
  const result = await service.removeCategory(req.params.id);

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
  updateStatus,
  remove,
};
