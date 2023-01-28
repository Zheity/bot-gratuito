//////////////////////////////////////////////////////////////
// BY: 24001#0001 ///////////////////////////////////////////
// Não mexa em nada aqui caso não saiba oque esta fazendo //
/////////////////////////////////////////////////////////////////////////
// Na parte // ticket // mexa somente no final dela lá no id do canal //
///////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const moment = require("moment");
const discordTranscripts = require('discord-html-transcripts');
const { ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle, MessageFlags, MessageDelete } = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)





/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// Ticket  //////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////



client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === "tickets_basico") {
        let nome_canal = `🎴Ticket-de-┃${interaction.user.username}`;
        let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);
  
        if (canal) {
          interaction.reply({ content: `Olá **${interaction.user.username}**, você já possui um ticket em ${canal}.`, ephemeral: true})
        } else {
  
          let categoria = interaction.channel.parent;
          if (!categoria) categoria = null;
  
          interaction.guild.channels.create({
  
            name: nome_canal,
            parent: categoria,
            type: Discord.ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [ Discord.PermissionFlagsBits.ViewChannel ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.AddReactions,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks
                ]
              },
            ]
  
          }).then( (chat) => {
  
            interaction.reply({ content: `Olá **${interaction.user}**, seu ticket foi aberto em ${chat}.`, ephemeral: true })
  
            let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`Olá ${interaction.user}, você abriu a seu ticket! \n\nPara fechar seu ticket, clique no botão abaixo...`);
  
            let botao_close = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
              .setCustomId("close_ticket")
              .setEmoji("🔒")
              .setStyle(Discord.ButtonStyle.Danger)
            );
  
            chat.send({ embeds: [embed], components: [botao_close] }).then(m => {
              m.pin()
            })
  
          })
        }
        
      } else if (interaction.customId === "close_ticket") {
        interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos.`)
        setTimeout(() => {
          try {
            interaction.channel.delete()
          } catch (e) {
            return
          }
        }, 5000)
      
    
  
        
        if (interaction.customId === "close_ticket") {

            const topic = interaction.user.username
    
            const channel = interaction.channel
    
            const attachment = await discordTranscripts.createTranscript(channel);
    
            interaction.channel.delete()
    
            let embed = new Discord.EmbedBuilder()
            .setDescription(`Ticket de ${topic}\`(${channel})\` \n Deletado por ${interaction.user}\`(${interaction.user.id})\``)
            .setColor("#8d00ff")
            .setTimestamp()

//////////////////////////////////////
// Mexa nesta parte aqui de baixo! //
////////////////////////////////////
    
            interaction.guild.channels.cache.get('Id do canal!').send({
              embeds: [embed],
              files: [attachment],
            })
    
          }
    
        }
      }
    }
)





///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  STATUS  ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  let status = [
    `🔥🚀 Feito pelo 24001#0001`,
    `🔥🚀 Meus comandos são em slash {/}`,
    `🔥🚀 Sou um bot gratuito!`,
    `🔥🚀 SITE: https://dazzbot.com/`,
  ]
  i = 0
  
  setInterval(() =>{
  client.user.setActivity(`${status[i++ % status.length]}`, { 
  })
  }, 500 * 10);
  
  
  


//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// comando de captcha  ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === "verificar") {
        let role_id = await db.get(`cargo_verificação_${interaction.guild.id}`);
        let role = interaction.guild.roles.cache.get(role_id);
        if (!role) return;
        interaction.member.roles.add(role.id)
        interaction.reply({ content: `*Ola ${interaction.user}, Você foi verificado é agora tem acesso ao nossos canais do discord.*`, ephemeral: true })
      }
    }
  })





