# FocusDesk — Project Planner & Media Studio

**FocusDesk** is a responsive, browser-based productivity workspace built with vanilla HTML, CSS, and JavaScript. It combines a lightweight task planner with local audio and video players in one clean interface.

> Portfolio project by [infoahmadi-projects](https://github.com/infoahmadi-projects).

## Features

### Project Planner
- Add tasks with a title, optional project name, and due date.
- Mark tasks as completed or reopen them.
- Filter tasks by **All**, **Open**, and **Completed**.
- Delete tasks.
- View the number of open tasks and a task summary.
- Persist tasks in the browser using `localStorage`.

### Media Studio
- Select an audio file from your device and play it in the built-in audio player.
- Select a video file from your device and play it in the built-in video player.
- Display the selected file name.
- Use temporary browser object URLs; media files are not uploaded to a server.

### Interface
- Responsive layout for desktop and mobile screens.
- Semantic HTML landmarks and accessible labels for key controls.
- No framework, build step, backend, or third-party package required.

## Preview

Open `index.html` in a modern web browser to use the application.

## Getting Started

### Option 1: Download
1. Download or clone this repository.
2. Extract the project files if downloaded as a ZIP.
3. Open `index.html` in a modern browser.

### Option 2: Clone with Git

```bash
git clone https://github.com/infoahmadi-projects/focusdesk.git
cd focusdesk
```

Then open `index.html` in your browser.

You can also run a simple local development server from the project directory:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000` in your browser.

## Project Structure

```text
focusdesk/
├── index.html
├── styles.css
├── app.js
├── README.md
├── LICENSE
└── .gitignore
```

## How It Works

- **HTML** defines the planner form, task list, filters, and media player elements.
- **CSS** provides the visual design and responsive layout.
- **JavaScript** handles task creation, completion, deletion, filtering, browser storage, and local media playback.
- **localStorage** saves the task list in the current browser under the key `focusdesk.tasks.v1`.
- **URL.createObjectURL()** creates temporary local references for selected media files. The application revokes these URLs when a new file is selected and when the page is unloaded.

## Data & Privacy Notes

- Tasks are stored locally in the browser where the application is used.
- Tasks are not synced between browsers or devices.
- Clearing the browser's site data may remove saved tasks.
- Selected audio and video files are played locally and are not sent to a server by this application.
- This project does not include user accounts, cloud storage, or a backend API.

## Browser Compatibility

Use a modern browser with support for JavaScript, `localStorage`, the HTML audio/video elements, and the File API. Media format support depends on the browser and operating system.

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser APIs: `localStorage`, `FormData`, `File API`, `URL.createObjectURL()`

## Roadmap

Possible future enhancements:

- Edit existing tasks.
- Add task priority and tags.
- Add sorting by due date.
- Export and import tasks.
- Add optional cloud synchronization.
- Add automated tests.

## Contributing

Suggestions, bug reports, and improvements are welcome. Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

**ALI HOSSEIN AHMADI**

- GitHub: https://github.com/infoahmadi-projects

If you find FocusDesk useful, consider giving the repository a star.
