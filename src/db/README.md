## STRUCTURE
.
├── README.md
├── migrate
│   ├── 20220202115303-create-user.js
│   ├── 20220202134510-create-course.js
│   ├── 20220202165034-add-associations.js
│   └── compiled
├── models
│   ├── course.ts
│   ├── index.ts
│   └── user.ts
├── seeders
│   ├── 20220202135006-demo-user.js
│   └── 20220202135024-demo-course.js
└── tests
    ├── main.ts
    └── user_tests.ts

Migrations and seeders are in .js as sequelize 6.x was giving issues with typescript 


## INSTALL

Perform all commands in ./src:
- npm run migrate
- npm run seed
- npm run test_db
