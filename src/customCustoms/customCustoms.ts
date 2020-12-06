export const travelerGroupUniqueAnswears = (input: string) =>
  input
    .split('\n\n')
    .map(section =>
      [
        ...new Set(
          section
            .split('\n')
            .map(k => k.split(''))
            .flat()
            .filter(a => a)
        ),
      ].reduce((p, _) => p + 1, 0)
    )
    .reduce((p, c) => c + p, 0)

export const questionsAnsweardByEveryTravelerInGroupCount = (input: string) =>
  input
    .split('\n\n')
    .filter(a => a)
    .map(section => {
      const numberOfAnswears = new Map<string, number>()
      const travelers = section.split('\n').filter(t => t)

      travelers.forEach(answear =>
        answear
          .split('')
          .forEach(c =>
            numberOfAnswears.set(c, (numberOfAnswears.get(c) ?? 0) + 1)
          )
      )

      return [...numberOfAnswears.values()].filter(
        val => val === travelers.length
      ).length
    })
    .reduce((p, c) => p + c, 0)
