export const getProjects = async (prisma, userId) => {
  const projects = await prisma.project.findMany({
    where: {
      owner: {
        id: userId,
      },
    },
  });

  return projects;
};
