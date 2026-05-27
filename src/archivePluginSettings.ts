import {App, PluginSettingTab, Setting} from "obsidian";
import MyPlugin from "./main";

export interface ArchivePluginSettings {
	archiveFolder: string;
}

export const DEFAULT_SETTINGS: ArchivePluginSettings = {
	archiveFolder: 'Done'
}

export class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Archive Folder')
			.setDesc('The folder to archive notes to.')
			.addText(text => text
				.setPlaceholder('Done')
				.setValue(this.plugin.settings.archiveFolder)
				.onChange(async (value) => {
					this.plugin.settings.archiveFolder = value;
					await this.plugin.saveSettings();
				}));
	}
}
