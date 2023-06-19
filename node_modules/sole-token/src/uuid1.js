const { networkInterfaces } = require('os');

/**
 * This method generate version 1 UUID
 * @returns uuid-1 array.
 */
let getUUID1 = () => {
    let clock_seq = parseInt((Math.random() * 1000) % 1000);
    /*
    TimeLow : 4 Bytes (8 hex chars) from the integer value of the low 32 bits of current UTC timestamp
    => 32 bits UTC
    */
    let time_low = new Date().getTime() & 0xFFFFFFFF;

    // TimeMid : 2 Bytes (4 hex chars) from the integer value of the middle 16 bits of current UTC time
    let time_mid = (new Date().getTime() >> 32) & 0xFFFF;


    /*
    TimeHighAndVersion : 2 Bytes (4 hex chars) contain the 4 bit UUID version (most significant bits) and the integer value of the high remaining 12 bits of current UTC time (timestamp is comprised of 60 bits)
    */
    let time_high_and_version = (new Date().getTime() >> 48) & 0x0FFF;
    time_high_and_version |= (1 << 12);


    /*
    ClockSequenceHiAndRes && ClockSequenceLow : 2 Bytes (4 hex chars) where the 1 through 3 (significant) bits contain the “variant” of the UUID version being used, and the remaining bits contain the clock sequence. The clock sequence is used to help avoid collisions if there a multiple UUID generators within the system or if a system clock for a generator was set backwards or doesn’t advance fast enough. For additional information around changing Node IDs and other collision considerations, see section 4.1.5 of the IETF RFC
    */
    let time_seq_low = clock_seq  & 0xFF;

    let time_seq_hi_and_reserved = (clock_seq & 0x3F00) >> 8
    time_seq_hi_and_reserved |= 0x80;

    let final_time_seq = (time_seq_low * time_seq_hi_and_reserved) & 0xFFFF;

    // Node : 6 bytes (12 hex chars) that represent the 48-bit “node id”, which is usually the MAC address of the host hardware that generated it.

    let node_id = networkInterfaces();

    return [time_low.toString(16), time_mid.toString(16), time_high_and_version.toString(16), final_time_seq.toString(16).length < 4 ? '0' + final_time_seq.toString(16) : final_time_seq.toString(16), node_id['eth1'][0].mac.replace(/:/g, '')];
}

module.exports = {
	getUUID1
}
