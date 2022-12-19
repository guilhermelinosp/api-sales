import handlebars from 'handlebars'
import fs from 'fs'

interface IParse {
  file: string
  variables: {
    [key: string]: string | number
  }
}

export class HandlebarsTemplate {
  public async parse({ file, variables }: IParse): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(templateFileContent)
    return parseTemplate(variables)
  }
}
