const { format } = require('date-fns');
const { parseISO } = require('date-fns');

const pt = require('date-fns/locale/pt');
const Mail = require('../../lib/Mail');

class CreateRegistration {
  get key() {
    return 'CreateRegistration';
  }

  async handle({ data }) {
    const { student, registration, plan, price, endDate } = data;

    console.log('A fila executou');

    await Mail.sedMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua Matricula foi criada',
      template: 'create', // nome do tamplate
      context: {
        // variáveis que seram eviadas para o tamplate
        student: student.name,
        plan: plan.title,
        total: price,
        dateStart: format(
          // formatando a data
          parseISO(registration.start_date),
          "'dia' dd 'de' MMMM", // dia 08 de outubro, às 13:00h
          { locale: pt },
        ),
        dateEnd: format(
          // formatando a data
          parseISO(endDate),
          "'dia' dd 'de' MMMM", // dia 08 de outubro, às 13:00h
          { locale: pt },
        ),
      },
    });
  }
}

module.exports = new CreateRegistration();
