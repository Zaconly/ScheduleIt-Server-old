const shortid = require("shortid")

const tags = []

const generateTags = (tasksId, tagsId) => {
  tags.push(
    ...[...Array(150)].map(() => ({
      id: shortid.generate(),
      taskId: tasksId[Math.floor(Math.random() * tasksId.length)],
      tagId: tagsId[Math.floor(Math.random() * tagsId.length)]
    }))
  )
}

module.exports = {
  up: async queryInterface => {
    const fetchedTasksId = await queryInterface.sequelize.query("SELECT id FROM Tasks")
    const fetchedTagsId = await queryInterface.sequelize.query("SELECT id FROM Tags")
    generateTags(
      fetchedTasksId[0].map(i => i.id),
      fetchedTagsId[0].map(i => i.id)
    )

    return queryInterface.bulkInsert("TaskTags", tags, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("TaskTags", null, {})
  }
}
