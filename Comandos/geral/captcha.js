const Discord = require('discord.js');

module.exports = {
    name: "verificação", // Nome principal do comando.
    description: "Sistema de Verificação", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
          interaction.reply(`Você não possui poermissão para utilizar este comando.`);
    } else {
      
      let botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setCustomId("Ver")
        .setEmoji('✅')
        .setStyle(Discord.ButtonStyle.Success),
       new Discord.ButtonBuilder()
       .setCustomId("Duvida")//i
       .setLabel(`・Dúvida`)
       .setEmoji('🧠')
       .setStyle(Discord.ButtonStyle.Danger)//f
       )      
       let embed = new Discord.EmbedBuilder()
       .setTitle(`Bem-Vindo`)
       .setDescription(`Bem-vindo ao servidor, clique no botão ✅ e verifique-se para ganhar acesso!`)
       .setColor('Green')
       .setThumbnail(client.user.displayAvatarURL())
        
       interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
       interaction.channel.send({ embeds: [embed], components: [botao] }).then( () => {
      
        client.on('interactionCreate', (interaction) => {
          if(interaction.isButton) {
            if (interaction.customId === "Ver") {
              let cargo1 = "1054849246085529700"
              let cargo2 = "1059214907624665088"
              let embedVerificado = new Discord.EmbedBuilder()
                .setDescription(`**✅ Você foi verificado com o cargo <@&${cargo1}> é o cargo <@&${cargo2}>!**`)
                .setColor("Green") 

                interaction.reply({ embeds: [embedVerificado], ephemeral: true})
                interaction.member.roles.add(`${cargo1}`)
                interaction.member.roles.add(`${cargo2}`)
              let EmbedLogV = new Discord.EmbedBuilder()
               .setTitle(`✅・Um usuário se verificou`)
               .setThumbnail(client.user.displayAvatarURL())
               .setColor('Green')
               .addFields(
                 {
                   name:'\`\`\`Usuário\`\`\`',
                   value:`${interaction.user}`,
                   inline: false,
                 },
               )
               .setTimestamp()
               interaction.guild.channels.cache.get('1059569161770110996').send({ embeds: [EmbedLogV] })  

              } else if(interaction.customId === "Duvida") {
                let embedDuvida1 = new Discord.EmbedBuilder()
                .setDescription(`**Irmão só clicar no botão ✅**`)
                .setColor("Red") 
                .setTimestamp()
                interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
                interaction.channel.send({ embeds: [embedDuvida1], ephemeral: true})
              }
              }     
       });
      })
    }
   }        
 }