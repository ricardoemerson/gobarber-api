interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };

}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'Equipe GoBarber',
      email: 'ricardo_emerson@yahoo.com.br',
    },
  },
} as IMailConfig;
