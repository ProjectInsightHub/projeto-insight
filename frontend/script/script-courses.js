document.addEventListener("DOMContentLoaded", () => {
  const fetchCourses = async () => {
    try {
      const response = await fetch("/dashboard/api/courses"); // Substitua pelo seu endpoint correto
      const data = await response.json();

      if (data.erro) {
        throw new Error(data.mensagem);
      }

      // Selecionar o container onde os cursos serão exibidos
      const coursesList = document.querySelector(".courses-list");

      // Limpar o conteúdo existente (exceto o título)
      coursesList.innerHTML = "<h1>Catálogo de Materiais</h1>";

      // Iterar sobre os cursos e criar elementos para exibi-los
      data.courses.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        courseCard.innerHTML = `
          <img
            src="../media/images/codfonte.jpg"
            alt="${course.name} Thumbnail"
          />
          <div class="course-info">
            <h2>${course.name}</h2>
            <p>${course.description}</p>
            <a href="#" class="btn enroll-btn" data-course-id="${course.id}" data-course-link="${course.link}">Inscreva-se</a>
          </div>
        `;

        coursesList.appendChild(courseCard);
      });

      // Adicionar evento de clique para os botões de inscrição
      const enrollButtons = document.querySelectorAll(".enroll-btn");
      enrollButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
          event.preventDefault();
          const courseId = button.getAttribute("data-course-id");
          const courseLink = button.getAttribute("data-course-link"); // Captura o link do curso
          await enrollUserInCourse(courseId, courseLink); // Passa o link para a função de inscrição
        });
      });
    } catch (error) {
      console.error("Erro ao buscar o conteudo:", error);
    }
  };

  const enrollUserInCourse = async (courseId, courseLink) => {
    try {
      const response = await fetch("/dashboard/api/user/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course_id: courseId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erro ao inscrever-se no conteudo"
        );
      }

      const data = await response.json();
      alert(data.message); // Exibe a mensagem de sucesso
      // Redirecionar para o link do curso
      window.location.href = courseLink; // Usa o link do curso passado
    } catch (error) {
      console.error("Erro:", error);
      alert("Você já está inscrito neste conteudo.");
    }
  };

  fetchCourses();
});

const toggleButtons = document.querySelectorAll('.edit-post');
const dropdowns = document.querySelectorAll('.dropdown');

// Função para mostrar o menu dropdown associado ao botão clicado
function showOptionsMenu(event) {
    // Mostra todos os dropdowns
    dropdowns.forEach(dropdown => {
        dropdown.hidden = false;
    });
}

// Função para esconder todos os menus dropdown
function hideOptionsMenu(event) {
    // Verifica se o clique não foi dentro dos menus dropdown ou no botão
    const isClickInsideDropdown = Array.from(dropdowns).some(dropdown => dropdown.contains(event.target));
    const isClickInsideButton = Array.from(toggleButtons).some(button => button.contains(event.target));
    
    if (!isClickInsideDropdown && !isClickInsideButton) {
        dropdowns.forEach(dropdown => {
            dropdown.hidden = true;
        });
    }
}

// Adiciona os manipuladores de eventos aos botões
toggleButtons.forEach(button => {
    button.addEventListener('click', showOptionsMenu);
});

// Adiciona o manipulador de eventos ao documento
document.addEventListener('click', hideOptionsMenu);
