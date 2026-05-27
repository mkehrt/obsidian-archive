import {App, Editor, FileManager, MarkdownView, Modal, Notice, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, ArchivePluginSettings, SampleSettingTab} from "./archivePluginSettings";
import path from 'path';

// Remember to rename these classes and interfaces!

export default class ArchivePlugin extends Plugin {
	settings: ArchivePluginSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'archive-note',
			name: 'Archive Note',
			callback: () => {
				this.archiveCurrentNote();
			}
		})

		this.addSettingTab(new SampleSettingTab(this.app, this));

	}

	async archiveCurrentNote() {
		const currentNote = this.app.workspace.getActiveFile();
		if (currentNote) {
			const archiveFolder = this.settings.archiveFolder;
			const archiveNotePath = archiveFolder + "/"  + currentNote.name;
			await this.app.fileManager.renameFile(currentNote, archiveNotePath);
		}
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<ArchivePluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
