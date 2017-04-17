#include <cstdlib>
#include <iostream>
#include <sstream>
#include <string>
#include <unistd.h>
#include <RF24/RF24.h>

using namespace std;

enum RESP_TYPES {
    RESP_OK = 0,
    RESP_TIMEOUT = 1,
    RESP_FAILED = 1
};

struct plant_package_t {
    uint16_t light;
    uint16_t moisture;
    uint16_t humidity;
    uint16_t temp;
};
//
// Hardware configuration
// Configure the appropriate pins for your connections

/****************** Raspberry Pi ***********************/

// Radio CE Pin, CSN Pin, SPI Speed
// See http://www.airspayce.com/mikem/bcm2835/group__constants.html#ga63c029bd6500167152db4e57736d0939 and the related enumerations for pin information.

// Setup for GPIO 22 CE and CE0 CSN with SPI Speed @ 4Mhz
//RF24 radio(RPI_V2_GPIO_P1_22, BCM2835_SPI_CS0, BCM2835_SPI_SPEED_4MHZ);

// NEW: Setup for RPi B+
//RF24 radio(RPI_BPLUS_GPIO_J8_15,RPI_BPLUS_GPIO_J8_24, BCM2835_SPI_SPEED_8MHZ);

// Setup for GPIO 15 CE and CE0 CSN with SPI Speed @ 8Mhz
//RF24 radio(RPI_V2_GPIO_P1_15, RPI_V2_GPIO_P1_24, BCM2835_SPI_SPEED_8MHZ);

// RPi generic:
// CS: GPIO_15, CE: GPIO_8
RF24 radio(15,8);

const uint8_t pipes[][6] = {"Node0", "Node1", "Node2", "HUB"};
const uint8_t ownPipe[6] = {"HUB"};


RESP_TYPES  pingNode(const uint8_t * addr, uint16_t maxTimeout) {
    radio.openWritingPipe(addr);
    radio.openReadingPipe(1, ownPipe);

    // First, stop listening so we can talk.
    radio.stopListening();

    // Take the time, and send it.  This will block until complete

    // printf("Now sending to: %s ::", addr);
    unsigned long time = millis();

    bool ok = radio.write( &time, sizeof(unsigned long) );

    if (!ok){
        return RESP_FAILED;
        // printf("failed.\n");
    }
    // Now, continue listening
    radio.startListening();

    // Wait here until we get a response, or timeout (250ms)
    unsigned long started_waiting_at = millis();
    bool timeout = false;
    while ( ! radio.available() && ! timeout ) {
        if (millis() - started_waiting_at > maxTimeout )
            timeout = true;
    }


    // Describe the results
    if ( timeout )
    {
        // printf("Failed, response timed out.\n");
        return RESP_TIMEOUT;
    }
    else
    {
        // Grab the response, compare, and send to debugging spew
        unsigned long got_time;
        plant_package_t pkg;
        while(radio.available()) {
            radio.read( &pkg, sizeof(plant_package_t) );
        }

        // Spew it
        cout << pkg.light << endl;
        cout << pkg.moisture << endl;
        cout << pkg.humidity << endl;
        cout << pkg.temp << endl;

        // for (int i = 0; i < 5; i++) {
        //     printf("0x%x ", c[i]);
        // }

        // printf("\n");
    }
}

int main(int argc, char** argv) {
    if (argc != 2 || strlen(argv[1]) > 6) {
        cout << "usage: " << argv[0] << " [node]\n Where [node] is less than 6 characters" << endl;
        return -1;
    }

    // Setup and configure rf radio
    radio.begin();

    // optionally, increase the delay between retries & # of retries
    radio.setRetries(15,15);

    // Dump the configuration of the rf unit for debugging
    // radio.printDetails();

    if (pingNode((const uint8_t *)argv[1], 800) == RESP_OK) {
        return 1;
    }
    else {
        return -1;
    }

    // while (1)
    // {
    //     pingNode(pipes[0]);
    //     sleep(1);
    //     pingNode(pipes[1]);
    //     sleep(1);
    // }

    return 0;
}

