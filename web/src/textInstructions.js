export const textInstructions = function (options) {
    const instructions = []

    instructions.push({instruction: 'Pour in the developer', time: 0})
    instructions.push({instruction: `Agitate continously for ${options.agitationContinously} seconds`, time: 0})
    instructions.push({instruction: 'Stop agitation.', time: options.agitationContinously})
    
    const nAgitations = Math.floor(options.developDuration / options.agitationInterval / 60)

    for(let agitation = 1; agitation <= nAgitations; agitation++) {
        instructions.push({instruction: 'Start agitating.', time: agitation * options.agitationInterval * 60})
        instructions.push({instruction: 'Stop agitating.', time: agitation * 60 + options.agitationLength})
    }

    instructions.push({instruction: 'Pour out the developer.', time: options.developDuration})

    return instructions
}