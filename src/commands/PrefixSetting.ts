import {DEFAULT} from '../components/BotSettingEmbed'
import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import DataHandler from '../utils/DataHandler'

export default class PrefixSetting extends Command {
    public constructor(){
        super('prefix_setting', {
            aliases: ['prefix'],
            category: 'Settings Command',
            description: {
                content: 'Settings Prefix Bot ',
                usage: 'prefix [value]',
                example: ["prefix [value]"]
            },
            cooldown: 60000,
            ratelimit: 1,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'value',
                    type: 'string',
                    match: 'separate'
                }
            ]
        })
    }

    public async exec(msg: Message, {value}: {value:string}):Promise<Message>{
        let lang:any = await DataHandler.getLang('guild', msg.guild!.id)
        let data:any = await DataHandler.getData('guild', msg.guild!.id)
        try {
            const p:string = await value
            if(p == null){
                msg.content = 'Missing Value!, Please read Settings Guide with command : `<prefix>set`'
                return await DEFAULT(msg, lang)
            }
            if(p == "info"){
                msg.content = `Prefix Command of this server : \`${data.prefix}\` `
                return await DEFAULT(msg, lang)
            }
            await DataHandler.update('guild', msg.guild!.id, {prefix: p[0]})
            msg.content = `The Prefix Command for this server now is : \`${p[0]}\` `
            return await DEFAULT(msg, lang)
        } catch (error) {
            console.log(error)
            msg.content = 'Something Wrong While Updating Prefix Command, Try again later'
            return await DEFAULT(msg, lang)
        }
        
    }
}