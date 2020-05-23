import fs from 'fs';
import handlebars from 'handlebars';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const templateFilecontent = await fs.promises.readFile(file, { encoding: 'utf-8' });

    const parseTemplate = handlebars.compile(templateFilecontent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
