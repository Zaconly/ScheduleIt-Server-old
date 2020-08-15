const faker = require("faker")
const shortid = require("shortid")

const templates = []
const baseProps = {
  createdAt: new Date(),
  updatedAt: new Date()
}

const generateTemplates = mainAccountId => {
  templates.push({
    id: shortid.generate(),
    name: "Kanban Board",
    desc: `# Kanban Board
      ---

      Use this Template to **organise** and .. 

      ## Description

      Some desc ...
      `,
    type: "KANBAN",
    authorId: mainAccountId,
    ...baseProps
  })

  templates.push({
    id: shortid.generate(),
    name: "Todo",
    desc: `# Todo
      ---

      Set up Task to do ... 

      ## Description

      Some desc ...
      `,
    type: "TODO",
    authorId: mainAccountId,
    ...baseProps
  })

  templates.push({
    id: shortid.generate(),
    name: "Calendar",
    desc: `# Calendar
      ---

      Set up Calendar ...

      ## Description

      Some desc ...
      `,
    type: "CALENDAR",
    authorId: mainAccountId,
    ...baseProps
  })

  templates.push({
    id: shortid.generate(),
    name: "Blog",
    desc: `# Blog
      ---

      Set up Blog ...

      ## Description

      Some desc ...
      `,
    type: "BLOG",
    authorId: mainAccountId,
    ...baseProps
  })

  templates.push({
    id: shortid.generate(),
    name: "Dashboard",
    desc: `# Dashboard
      ---

      Set up Dashboard ...

      ## Description

      Some desc ...
      `,
    type: "DASHBOARD",
    authorId: mainAccountId,
    ...baseProps
  })

  templates.push({
    id: shortid.generate(),
    name: "Follow-up",
    desc: `# Follow-up
      ---

      Set up Follow-up ...

      ## Description

      Some desc ...
      `,
    type: "FOLLOWUP",
    authorId: mainAccountId,
    ...baseProps
  })

  templates.push({
    id: shortid.generate(),
    name: "Feed",
    desc: `# Feed
      ---

      Set up Feed ...

      ## Description

      Some desc ...
      `,
    type: "FEED",
    authorId: mainAccountId,
    ...baseProps
  })
}

module.exports = {
  up: async queryInterface => {
    const fetchedUserId = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE username = "ScheduleIt"'
    )
    generateTemplates(fetchedUserId[0].map(i => i.id)[0])

    return queryInterface.bulkInsert("Templates", templates, {})
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Templates", null, {})
  }
}
