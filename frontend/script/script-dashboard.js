document.addEventListener("DOMContentLoaded", () => {
  // Função que busca o nome do usuário do backend
  async function fetchUserName() {
    try {
      const response = await fetch('/dashboard/api'); // Substitua pelo endpoint correto do seu back-end
      if (!response.ok) {
        throw new Error("Erro ao buscar o nome do usuário");
      }
      const data = await response.json();
      return data.username; // Supondo que o back-end retorna um objeto { name: "Nome do Usuário" }
    } catch (error) {
      console.error("Erro:", error);
      return "Visitante"; // Valor padrão em caso de erro
    }
  }

  // Função para obter a saudação baseada no horário
  function getGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return "Bom dia";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Boa tarde";
    } else if (currentHour >= 18 && currentHour < 24) {
      return "Boa noite";
    } else {
      return "Boa madrugada";
    }
  }

  async function fetchUserCourses() {
    try {
        const response = await fetch('/dashboard/api/user/courses'); // Substitua pelo endpoint correto do seu back-end
        if (!response.ok) {
            throw new Error("Erro ao buscar os cursos do usuário");
        }
        const data = await response.json();
        return data; // Retorna diretamente o array de cursos
    } catch (error) {
        console.error("Erro:", error);
        return []; // Retorna um array vazio se houver erro
    }
}


function renderCourses(courses) { 
    const coursesListElement = document.querySelector(".courses-list");

    // Limpa a lista de cursos antes de adicionar novos (garantir que não haja duplicatas)
    coursesListElement.innerHTML = '<h1>Área de Estudos</h1>';

    // Se houver cursos, cria os cards dinamicamente
    if (courses.length > 0) {
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');

            courseCard.innerHTML = `
		<img src="https://destinopoa.com.br/wp-content/uploads/2024/03/Captura-de-tela-2024-03-26-155029-1024x303.jpg" alt="Course Thumbnail" />
                <div class="course-info">
                    <h2>${course.course_name || 'Título do Curso'}</h2>
                    <p>${course.description || 'Descrição do curso não disponível'}</p>
                    <a href="${course.link}" class="btn">Ver Detalhes</a>
                </div>
            `;

            coursesListElement.appendChild(courseCard);
        });
    } else {
        // Exibe uma mensagem caso o usuário não esteja inscrito em nenhum curso
        const noCoursesMessage = document.createElement('p');
        noCoursesMessage.textContent = 'Você não está inscrito em nenhum conteúdo';
        coursesListElement.appendChild(noCoursesMessage);
    }
}


  // Substitui o texto "Berlim" com o nome recebido do backend e ajusta a saudação
  async function updateWelcomeText() {
    const userName = await fetchUserName();
    const greeting = getGreeting();
    const welcomeTextElement = document.querySelector(".welcome-text");
    if (welcomeTextElement) {
      welcomeTextElement.textContent = `${greeting}, ${userName}`;
    }
  }

  // Chama a função para atualizar o nome e saudação
  updateWelcomeText();

  // Chama a função para buscar e renderizar os cursos
  async function loadCourses() {
    const courses = await fetchUserCourses();
    renderCourses(courses);
  }

  loadCourses(); // Executa o carregamento dos cursos ao carregar a página
});

  
