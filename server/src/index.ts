import Core, {logger, server} from 'core';
import RoleModel from 'role-model';
import Tasks from 'tasks';

server.dbConfigure({
  chain: [
    Core.dbChain,
    RoleModel.dbChain,
    Tasks.dbChain,
  ],
  relations: [
    RoleModel.dbRelations,
    Tasks.dbRelations,
  ],
});

server.configure({
  error: {withInfo: true},
});

server.useControllers(Core.controllers);
server.useControllers(RoleModel.controllers);
server.useControllers(Tasks.controllers);

server.start(async () => {
  logger.logFullObject(server.getAllRoutes());
});