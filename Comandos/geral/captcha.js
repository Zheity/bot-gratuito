const Discord = require('discord.js');

/////////////////////////////////////////////////////////////
/// BY: 24001#0001 /////////////////////////////////////////
///////////////////////////////////////////////////////////
// mexa somente no id do canal da logs e no id do cargo //
/////////////////////////////////////////////////////////

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
              let cargo1 = "COLOQUE O ID DO CARGO"
              let embedVerificado = new Discord.EmbedBuilder()
                .setDescription(`**✅ Você foi verificado com o cargo <@&${cargo1}>**`)
                .setColor("Green") 

                interaction.reply({ embeds: [embedVerificado], ephemeral: true})
                interaction.member.roles.add(`${cargo1}`)
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
               interaction.guild.channels.cache.get('ID DO CANAL PARA ENVIO DAS LOGS').send({ embeds: [EmbedLogV] })  

       
       }});
      })
    }
   }        
 }
